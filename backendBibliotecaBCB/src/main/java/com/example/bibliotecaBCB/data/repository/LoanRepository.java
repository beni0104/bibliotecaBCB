package com.example.bibliotecaBCB.data.repository;

import com.example.bibliotecaBCB.data.entity.Loan;
import com.example.bibliotecaBCB.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByUserNameAndUserIsNull(String userName);

    List<Loan> findByUser(User user);
}
