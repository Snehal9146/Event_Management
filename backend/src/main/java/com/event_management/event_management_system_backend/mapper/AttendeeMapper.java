package com.event_management.event_management_system_backend.mapper;

import com.event_management.event_management_system_backend.Dto.AttendeeDto;
import com.event_management.event_management_system_backend.model.Attendee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttendeeMapper {
    AttendeeDto attendeeToAttendeeDto(Attendee attendee);

    Attendee attendeeDtoToAttendee(AttendeeDto attendeeDto);
}
