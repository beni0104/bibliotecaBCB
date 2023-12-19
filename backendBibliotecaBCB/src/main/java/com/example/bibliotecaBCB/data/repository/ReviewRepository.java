package com.example.bibliotecaBCB.data.repository;


import com.example.bibliotecaBCB.data.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
