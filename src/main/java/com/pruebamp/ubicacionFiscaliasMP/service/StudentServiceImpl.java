package com.pruebamp.ubicacionFiscaliasMP.service;

import com.pruebamp.ubicacionFiscaliasMP.model.Fiscalia;
import com.pruebamp.ubicacionFiscaliasMP.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl extends StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Fiscalia saveStudent(Fiscalia fiscalia) {
        return studentRepository.save(fiscalia);
    }

    @Override
    public List<Fiscalia> getAllFiscalias() {
        return studentRepository.findAll();
    }
}
