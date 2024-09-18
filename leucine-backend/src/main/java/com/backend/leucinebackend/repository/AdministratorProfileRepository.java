package com.backend.leucinebackend.repository;

import com.backend.leucinebackend.entity.AdministratorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdministratorProfileRepository extends JpaRepository<AdministratorProfile, Long> {
    


    List<AdministratorProfile>  findByUserId(int userId);
}

