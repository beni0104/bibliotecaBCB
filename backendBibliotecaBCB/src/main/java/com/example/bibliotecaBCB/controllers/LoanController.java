package com.example.bibliotecaBCB.controllers;

import com.example.bibliotecaBCB.data.dto.LoanDTO;
import com.example.bibliotecaBCB.data.entity.Loan;
import com.example.bibliotecaBCB.data.service.LoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Loan>> getAllLoans(){
        return ResponseEntity.ok(loanService.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<Loan> createLoan(@RequestBody LoanDTO loanDTO){
        Loan loan = new Loan(loanDTO.getDateLoaned(), loanDTO.getDateReturned());
        loanService.save(loan);
        return ResponseEntity.ok(loan);
    }


}
