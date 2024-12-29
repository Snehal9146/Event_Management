package com.event_management.event_management_system_backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {
    private Long id;
    private String username;
    private String name;
    private String city;
    private String country;
    private String place;
    private String description;
    private Date date;
}
