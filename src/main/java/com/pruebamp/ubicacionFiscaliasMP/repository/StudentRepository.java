package com.pruebamp.ubicacionFiscaliasMP.repository;

import com.pruebamp.ubicacionFiscaliasMP.model.Fiscalia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Fiscalia,Integer> {

}
