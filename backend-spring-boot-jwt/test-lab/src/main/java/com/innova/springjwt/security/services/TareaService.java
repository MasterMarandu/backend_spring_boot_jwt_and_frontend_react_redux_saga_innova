package com.innova.springjwt.security.services;

import com.innova.springjwt.models.Proyecto;
import com.innova.springjwt.models.Tarea;
import com.innova.springjwt.repository.ProyectoRepository;
import com.innova.springjwt.repository.TareaRepository;
import com.innova.springjwt.utils.dto.ProyectoDTO;
import com.innova.springjwt.utils.dto.TareaDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TareaService {
    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private TareaRepository tareaRepository;
    
	public void saveTareas(Proyecto savedProyecto, ProyectoDTO proyectoDTO) {
		List<Tarea> tareas = convertirAProductoDTO(proyectoDTO, savedProyecto);
        for(Tarea tarea: tareas) {
        	tareaRepository.save(tarea);
        }
	}


    // Crear una nueva tarea
    public Tarea crearTarea(TareaDTO tareaDTO, Long proyectoId) {
        Optional<Proyecto> proyectoOptional = proyectoRepository.findById(proyectoId);
        if (proyectoOptional.isPresent()) {
            Tarea tarea = new Tarea();
            tarea.setNombre(tareaDTO.getNombre());
            tarea.setDescripcion(tareaDTO.getDescripcion());
            tarea.setEstado(tareaDTO.getEstado());
            tarea.setProyecto(proyectoOptional.get());
            return tareaRepository.save(tarea);
        } else {
            throw new RuntimeException("Proyecto no encontrado con ID: " + proyectoId);
        }
    }

    // Actualizar el estado de una tarea
    public Tarea actualizarEstadoTarea(Long id, String estado) {
        Optional<Tarea> tareaOptional = tareaRepository.findById(id);
        if (tareaOptional.isPresent()) {
            Tarea tarea = tareaOptional.get();
            tarea.setEstado(estado);
            return tareaRepository.save(tarea);
        } else {
            throw new RuntimeException("Tarea no encontrada con ID: " + id);
        }
    }

    // Obtener tareas filtradas por proyecto
    public List<Tarea> obtenerTareasPorProyecto(Long proyectoId) {
        return tareaRepository.findByProyectoId(proyectoId);
    }
    
    public List<Tarea> obtenerTareasPorUsuario(Long userId) {
        return tareaRepository.findByUserId(userId);
    }
    
    public List<Tarea> convertirAProductoDTO(ProyectoDTO proyectoDTO, Proyecto proyecto) {
        List<Tarea> dataDTOs = proyectoDTO.getTareas().stream()
                .map(tareaDTO -> {
                    Tarea tarea = convertirATarea(tareaDTO);
                    tarea.setProyecto(proyecto);  // Asignar el proyecto a cada tarea
                    return tarea;
                })
                .collect(Collectors.toList());
        
        return dataDTOs;
    }

    private Tarea convertirATarea(TareaDTO tarea) {
        return new Tarea(
            tarea.getNombre(),
            tarea.getDescripcion(),
            tarea.getEstado(),
                tarea.getUser_id());
    }


}
