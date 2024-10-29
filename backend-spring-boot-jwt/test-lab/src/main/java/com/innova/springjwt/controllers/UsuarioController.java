package com.innova.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innova.springjwt.models.User;
import com.innova.springjwt.security.services.UsuarioService;

@RestController
@RequestMapping("/api/users")
public class UsuarioController {
	
	  @Autowired
	    private UsuarioService userService;

	    @GetMapping("/role/user")
	    @PreAuthorize("hasRole('ADMIN')") // Solo permite el acceso a usuarios con rol ADMIN
		public ResponseEntity<List<User>> getUsersByRoleUser() {
 	        List<User> users = userService.getAllUsersWithRoleUser();
	        if (users.isEmpty()) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(users);
	    }

}
