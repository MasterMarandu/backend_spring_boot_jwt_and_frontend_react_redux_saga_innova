package com.innova.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innova.springjwt.models.User;
import com.innova.springjwt.repository.UserRepository;

import java.util.List;

@Service
public class UsuarioService {
	@Autowired
	private UserRepository usuarioRepository;

	public List<User> getAllUsersWithRoleUser() {
		return usuarioRepository.findAllByRoleUser();
	}
}
