package com.pruebamp.ubicacionFiscaliasMP.service;

import com.pruebamp.ubicacionFiscaliasMP.model.Fiscalia;
import com.pruebamp.ubicacionFiscaliasMP.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public abstract class  StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public abstract Fiscalia saveStudent(Fiscalia fiscalia);
    public abstract List<Fiscalia> getAllFiscalias();

    public List<Fiscalia> listAll(){
        return studentRepository.findAll();
    }

    public void save(Fiscalia fiscalia){
        studentRepository.save(fiscalia);
    }

    public Fiscalia get(Integer id){
        return studentRepository.findById(id).get();
    }

    public void delete(Integer id){
        studentRepository.deleteById(id);
    }
}
