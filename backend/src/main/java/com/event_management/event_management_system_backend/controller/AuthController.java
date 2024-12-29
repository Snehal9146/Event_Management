package com.event_management.event_management_system_backend.controller;

import com.event_management.event_management_system_backend.Dto.*;
import com.event_management.event_management_system_backend.config.UserAuthenticationProvider;
import com.event_management.event_management_system_backend.mapper.AttendeeMapper;
import com.event_management.event_management_system_backend.mapper.EventMapper;
import com.event_management.event_management_system_backend.model.Attendee;
import com.event_management.event_management_system_backend.model.Event;
import com.event_management.event_management_system_backend.repositories.AttendeeRepository;
import com.event_management.event_management_system_backend.repositories.EventRepository;
import com.event_management.event_management_system_backend.services.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final AdminService adminService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final AttendeeMapper attendeeMapper;
    private final AttendeeRepository attendeeRepository;

    @PostMapping("/login")
    public ResponseEntity<AdminDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        AdminDto adminDto = adminService.login(credentialsDto);
        adminDto.setToken(userAuthenticationProvider.createToken(adminDto.getUsername())); // Ensure AdminDto has setToken method
        return ResponseEntity.ok(adminDto);
    }

    @PostMapping("/register")
    public ResponseEntity<AdminDto> register(@RequestBody @Valid SignUpDto signUpDto) {
        AdminDto newAdmin = adminService.register(signUpDto);
        newAdmin.setToken(userAuthenticationProvider.createToken(newAdmin.getUsername())); // Ensure AdminDto has setToken method
        return ResponseEntity.created(URI.create("/admins/" + newAdmin.getId())).body(newAdmin);
    }

    @PostMapping("/addevent")
    public ResponseEntity<EventDto> addEvent(@RequestBody @Valid EventDto eventDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Event newEvent = eventMapper.eventDtoToEvent(eventDto); // Ensure eventMapper methods are correctly defined
        newEvent.setUsername(username); // Set the username for the event

        Event savedEvent = eventRepository.save(newEvent); // Save the event
        EventDto savedEventDto = eventMapper.eventToEventDto(savedEvent); // Map saved event back to DTO
        return ResponseEntity.ok(savedEventDto);
    }

    @GetMapping("/getevent")
    public ResponseEntity<List<EventDto>> getEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        List<Event> events = eventRepository.findByUsername(username); // Ensure this method is in EventRepository
        List<EventDto> eventDtoList = eventMapper.listEventToDto(events); // Ensure eventMapper methods are correctly defined
        return ResponseEntity.ok(eventDtoList);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @RequestBody EventDto updatedEventDto) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(updatedEventDto.getName());
                    event.setCity(updatedEventDto.getCity());
                    event.setCountry(updatedEventDto.getCountry());
                    event.setPlace(updatedEventDto.getPlace());
                    event.setDescription(updatedEventDto.getDescription());
                    event.setDate(updatedEventDto.getDate());

                    Event savedEvent = eventRepository.save(event); // Save the updated event
                    return ResponseEntity.ok(eventMapper.eventToEventDto(savedEvent)); // Return the saved event DTO
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getallevents")
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<Event> events = eventRepository.findAll(); // Get all events
        List<EventDto> eventDtoList = eventMapper.listEventToDto(events); // Map to DTO list
        return ResponseEntity.ok(eventDtoList);
    }

    @PostMapping("/addattendee")
    public ResponseEntity<Attendee> addAttendee(@RequestBody @Valid Attendee attendee) {
        Attendee savedAttendee = attendeeRepository.save(attendee); // Save attendee
        return ResponseEntity.ok(savedAttendee);
    }

    @GetMapping("/attendees/{id}")
    public ResponseEntity<List<Attendee>> getAllAttendees(@PathVariable Long id) {
        List<Attendee> attendees = attendeeRepository.findByEventid(id); // Find attendees for event
        return ResponseEntity.ok(attendees);
    }
}
