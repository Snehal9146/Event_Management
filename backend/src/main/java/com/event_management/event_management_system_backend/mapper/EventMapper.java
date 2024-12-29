package com.event_management.event_management_system_backend.mapper;

import com.event_management.event_management_system_backend.Dto.AdminDto;
import com.event_management.event_management_system_backend.Dto.EventDto;
import com.event_management.event_management_system_backend.Dto.SignUpDto;
import com.event_management.event_management_system_backend.Dto.UserDto;
import com.event_management.event_management_system_backend.model.Event;
import com.event_management.event_management_system_backend.model.admin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel= "spring")
public interface EventMapper {

    EventDto eventToEventDto(Event event);
    Event eventDtoToEvent(EventDto eventDto);

    List<EventDto> listEventToDto(List<Event> events);
}