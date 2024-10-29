package com.innova.springjwt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.innova.springjwt.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);
  
  @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'ROLE_USER'")
  List<User> findAllByRoleUser();

}
