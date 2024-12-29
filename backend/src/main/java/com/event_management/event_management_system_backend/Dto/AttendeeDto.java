package com.event_management.event_management_system_backend.Dto;

import jakarta.validation.constraints.NotEmpty;

public class AttendeeDto {
    private Long id;

    private String name;
    private String email;
    private Long eventid;
}
