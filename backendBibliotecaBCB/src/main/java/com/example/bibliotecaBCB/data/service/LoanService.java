package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.Loan;
import com.example.bibliotecaBCB.data.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public List<Loan> findAll(){
        return loanRepository.findAll();
    }

    public void save(Loan loan){
        loanRepository.save(loan);
    }

    public void update(Loan loan){
        loanRepository.save(loan);
    }

}
