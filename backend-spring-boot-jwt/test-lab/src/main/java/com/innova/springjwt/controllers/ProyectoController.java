package com.innova.springjwt.controllers;

import com.innova.springjwt.models.Proyecto;
import com.innova.springjwt.security.services.ProyectoService;
import com.innova.springjwt.utils.dto.ProyectoDTO;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/projects")
public class ProyectoController {
    @Autowired
    private ProyectoService proyectoService;
    // Crear un nuevo proyecto
    @PostMapping
    public ResponseEntity<ProyectoDTO> crearProyecto(@RequestBody ProyectoDTO proyectoDTO) {
        proyectoService.crearProyecto(proyectoDTO);
        return ResponseEntity.ok(proyectoDTO);
    }

    // Obtener todos los proyectos
    @GetMapping
    public ResponseEntity<List<Proyecto>> obtenerProyectos() {
        List<Proyecto> proyectos = proyectoService.obtenerProyectos();
        return ResponseEntity.ok(proyectos);
    }

    // Obtener un proyecto por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> obtenerProyectoPorId(@PathVariable Long id) {
        Optional<Proyecto> proyecto = proyectoService.obtenerProyectoPorId(id);
        return proyecto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un proyecto
    @PutMapping("/{id}")
    public ResponseEntity<Proyecto> actualizarProyecto(@PathVariable Long id, @RequestBody ProyectoDTO proyectoDTO) {
        Proyecto proyecto = proyectoService.actualizarProyecto(id, proyectoDTO);
        return ResponseEntity.ok(proyecto);
    }

    // Eliminar un proyecto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProyecto(@PathVariable Long id) {
        proyectoService.eliminarProyecto(id);
        return ResponseEntity.noContent().build();
    }
}
