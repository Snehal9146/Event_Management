package com.event_management.event_management_system_backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.http.HttpHeaders;

import java.io.IOException;


@RequiredArgsConstructor
public class JWTAuthFilter extends OncePerRequestFilter {
    private final UserAuthenticationProvider userAuthenticationProvider = new UserAuthenticationProvider();

    public JWTAuthFilter(UserAuthenticationProvider userAuthenticationProvider2) {
		// TODO Auto-generated constructor stub
	}

	@Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws IOException, ServletException{

        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
        if(header != null){
            String[] authElements = header.split(" ");

            if(authElements.length == 2 && "Bearer".equals(authElements[0]) && authElements[1]!=null){
                try {
                    System.out.println(authElements[1]);

                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthenticationProvider.validateToken(authElements[1])
                    );
                }
                catch (RuntimeException e){
                    SecurityContextHolder.clearContext();
                    throw e;
                }
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
