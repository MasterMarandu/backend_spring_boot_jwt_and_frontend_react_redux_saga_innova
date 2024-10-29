package com.innova.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innova.springjwt.models.Proyecto;


@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
}

