package com.event_management.event_management_system_backend.Dto;

import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDto {
    private Long id;
    private String name;
    private String username;
    private String token;
    private String email;
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}
	public void setToken(String createToken) {
		// TODO Auto-generated method stub
		
	}
}