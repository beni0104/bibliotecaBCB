package com.example.bibliotecaBCB.data.repository;

import java.util.Optional;

import com.example.bibliotecaBCB.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
