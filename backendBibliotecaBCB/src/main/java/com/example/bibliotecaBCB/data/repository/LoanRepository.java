package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
