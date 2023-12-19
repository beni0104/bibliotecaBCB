package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.LoanRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRequestRepository extends JpaRepository<LoanRequest, Long> {
}
