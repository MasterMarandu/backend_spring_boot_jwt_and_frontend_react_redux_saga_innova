package com.innova.springjwt.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.innova.springjwt.models.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
	
    List<Tarea> findByProyectoId(Long proyectoId);
   
    
    @Query("SELECT t FROM Tarea t WHERE t.user_id = :userId")
    List<Tarea> findByUserId(@Param("userId") Long userId);
}