package com.event_management.event_management_system_backend.repositories;

import com.event_management.event_management_system_backend.model.admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<admin, Integer> {
    Optional<admin> findByUsername(String login);
}
