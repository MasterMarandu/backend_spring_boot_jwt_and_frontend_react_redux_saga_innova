package com.innova.springjwt.utils.dto;

import java.time.LocalDate;
import java.util.List;

public class ProyectoDTO {
    private String nombre;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFinalizacion;
    private List<TareaDTO> tareas;

    public ProyectoDTO(String nombre, String descripcion, LocalDate fechaInicio, LocalDate fechaFinalizacion, List<TareaDTO> tareas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.tareas = tareas;
    }

    public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public LocalDate getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(LocalDate fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public LocalDate getFechaFinalizacion() {
		return fechaFinalizacion;
	}

	public void setFechaFinalizacion(LocalDate fechaFinalizacion) {
		this.fechaFinalizacion = fechaFinalizacion;
	}

	public List<TareaDTO> getTareas() {
		return tareas;
	}
	
	public void setTareas(List<TareaDTO> tareas) {
		this.tareas = tareas;
	}
}
