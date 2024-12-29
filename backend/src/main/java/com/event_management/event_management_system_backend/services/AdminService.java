package com.event_management.event_management_system_backend.services;

import com.event_management.event_management_system_backend.Dto.AdminDto;
import com.event_management.event_management_system_backend.Dto.CredentialsDto;
import com.event_management.event_management_system_backend.Dto.SignUpDto;
import com.event_management.event_management_system_backend.exception.AppException;
import com.event_management.event_management_system_backend.mapper.AdminMapper;
import com.event_management.event_management_system_backend.model.admin;  // Ensure correct class name
import com.event_management.event_management_system_backend.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;

    // Login method
    public AdminDto login(CredentialsDto credentialsDto) {
        // Correct usage of Admin class instead of 'admin'
        admin Admin = adminRepository.findByUsername(credentialsDto.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        // Correctly comparing the raw password with the encoded password
        if (passwordEncoder.matches(credentialsDto.getPassword(), Admin.getPassword())) {
            return adminMapper.toAdminDto(Admin);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    // Register method
    public AdminDto register(SignUpDto signUpDto) {
        // Check if the username already exists
        Optional<admin> optionalAdmin = adminRepository.findByUsername(signUpDto.getUsername());

        if (optionalAdmin.isPresent()) {
            throw new AppException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        // Map the SignUpDto to Admin entity
        admin Admin = adminMapper.signUpToAdmin(signUpDto);

        // Encode the password before saving
        admin.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

        // Save the new admin and return the DTO
        admin savedAdmin = adminRepository.save(Admin);
        return adminMapper.toAdminDto(savedAdmin);
    }

    // Find admin by username
    public AdminDto findByUsername(String username) {
        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return adminMapper.toAdminDto(admin);
    }
}
