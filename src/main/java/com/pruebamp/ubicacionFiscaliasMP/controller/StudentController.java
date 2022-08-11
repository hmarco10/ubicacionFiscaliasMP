package com.pruebamp.ubicacionFiscaliasMP.controller;


import com.pruebamp.ubicacionFiscaliasMP.model.Fiscalia;
import com.pruebamp.ubicacionFiscaliasMP.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/Fiscalia")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public  String add(@RequestBody Fiscalia fiscalia){
        studentService.save(fiscalia);
        return "Nueva Fiscalia ha sido agregada";
    }

    @GetMapping("/getAll")
    public List<Fiscalia> getAllStudents(){
        return studentService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fiscalia> get(@PathVariable Integer id) {
        try {
            Fiscalia fiscalia = studentService.get(id);
            return new ResponseEntity<Fiscalia>(fiscalia, HttpStatus.OK);

        } catch (NoSuchElementException e) {
            return new ResponseEntity<Fiscalia>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Fiscalia> update(@RequestBody Fiscalia fiscalia){
        try{
            studentService.save(fiscalia);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Fiscalia>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        studentService.delete(id);
        return "FIscalia borrada "+id;
    }

}