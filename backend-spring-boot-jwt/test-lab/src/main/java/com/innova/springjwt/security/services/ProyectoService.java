package com.innova.springjwt.security.services;

import com.innova.springjwt.models.Proyecto;
import com.innova.springjwt.models.Tarea;
import com.innova.springjwt.repository.ProyectoRepository;
import com.innova.springjwt.utils.dto.ProyectoDTO;
import com.innova.springjwt.utils.dto.TareaDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;
    
    @Autowired
    private TareaService tareaService;

       // Crear un nuevo proyecto junto con sus tareas
       public ProyectoDTO crearProyecto(ProyectoDTO proyectoDTO) {
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(proyectoDTO.getNombre());
        proyecto.setDescripcion(proyectoDTO.getDescripcion());
        proyecto.setFechaInicio(proyectoDTO.getFechaInicio());
        proyecto.setFechaFinalizacion(proyectoDTO.getFechaFinalizacion());
        Proyecto savedProyecto = proyectoRepository.save(proyecto);
        tareaService.saveTareas(savedProyecto, proyectoDTO);
        return proyectoDTO;
    }

    // Obtener todos los proyectos
    public List<Proyecto> obtenerProyectos() {
        return proyectoRepository.findAll();
    }

    // Obtener un proyecto por su ID
    public Optional<Proyecto> obtenerProyectoPorId(Long id) {
        return proyectoRepository.findById(id);
    }

    // Actualizar un proyecto
    public Proyecto actualizarProyecto(Long id, ProyectoDTO proyectoDTO) {
        Optional<Proyecto> proyectoOptional = proyectoRepository.findById(id);
        if (proyectoOptional.isPresent()) {
            Proyecto proyecto = proyectoOptional.get();
            proyecto.setNombre(proyectoDTO.getNombre());
            proyecto.setDescripcion(proyectoDTO.getDescripcion());
            proyecto.setFechaInicio(proyectoDTO.getFechaInicio());
            proyecto.setFechaFinalizacion(proyectoDTO.getFechaFinalizacion());
            proyecto.setTareas(convertirAProductoDTO(proyectoDTO, proyecto));
            return proyectoRepository.save(proyecto);
        } else {
            throw new RuntimeException("Proyecto no encontrado con ID: " + id);
        }
    }

    // Eliminar un proyecto
    public void eliminarProyecto(Long id) {  // Eliminar todas las tareas asociadas
        proyectoRepository.deleteById(id);
    }

    public List<Tarea> convertirAProductoDTO(ProyectoDTO proyectoDTO, Proyecto proyecto) {
        List<Tarea> dataDTOs = proyectoDTO.getTareas().stream()
                .map(tareaDTO -> {
                    Tarea tarea = convertirATarea(tareaDTO);
                    //tarea.setProyecto(proyecto);  // Asignar el proyecto a cada tarea
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
