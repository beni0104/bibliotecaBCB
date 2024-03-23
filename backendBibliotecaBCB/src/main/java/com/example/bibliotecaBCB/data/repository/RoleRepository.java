package com.example.bibliotecaBCB.data.repository;

import java.util.Optional;

import com.example.bibliotecaBCB.data.entity.ERole;
import com.example.bibliotecaBCB.data.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}