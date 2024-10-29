package com.innova.springjwt.controllers;

import com.innova.springjwt.models.Tarea;
import com.innova.springjwt.security.services.TareaService;
import com.innova.springjwt.utils.dto.TareaDTO;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tasks")
public class TareaController {
    
    @Autowired
    private TareaService tareaService;
   
    // POST /tasks: Crear una nueva tarea
    @PostMapping
    public ResponseEntity<Tarea> crearTarea(@RequestBody TareaDTO tareaDTO, @RequestParam Long projectId) {
        Tarea tarea = tareaService.crearTarea(tareaDTO, projectId);
        return ResponseEntity.ok(tarea);
    }

    // PATCH /tasks/{id}: Actualizar el estado de una tarea
    @PostMapping("/{id}")
    public ResponseEntity<Tarea> actualizarEstadoTarea(@PathVariable Long id, @RequestParam String estado) {
        Tarea tarea = tareaService.actualizarEstadoTarea(id, estado);
        return ResponseEntity.ok(tarea);
    }

    // GET /tasks?project_id={id}: Obtener tareas filtradas por proyecto
    @GetMapping
    public ResponseEntity<List<Tarea>> obtenerTareasPorProyecto(@RequestParam("project_id") Long projectId) {
        List<Tarea> tareas = tareaService.obtenerTareasPorProyecto(projectId);
        return ResponseEntity.ok(tareas);
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Tarea>> obtenerTareasPorUsuario(@PathVariable("id") Long userId) {
        List<Tarea> tareas = tareaService.obtenerTareasPorUsuario(userId);
        return ResponseEntity.ok(tareas);
    }
}
