package com.innova.springjwt.utils.dto;

public class TareaDTO {
    private String nombre;
    private String descripcion;
	private String estado;
    private Long user_id;

    public TareaDTO(String nombre, String descripcion, String estado, Long user_id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
		this.estado = estado;
        this.user_id = user_id;
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
    
    

}
