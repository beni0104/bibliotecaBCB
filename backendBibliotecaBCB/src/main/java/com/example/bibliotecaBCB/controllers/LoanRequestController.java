package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.entity.LoanRequest;
import com.example.bibliotecaBCB.data.service.LoanRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/loanRequest")
public class LoanRequestController {
    private final LoanRequestService loanRequestService;

    public LoanRequestController(LoanRequestService loanRequestService) {
        this.loanRequestService = loanRequestService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<LoanRequest>> getAllLoanRequests(){
        return ResponseEntity.ok(loanRequestService.findAll());
    }

//    @PostMapping("/create")
//    public ResponseEntity<LoanRequest> createLoanRequest(@RequestBody LoanRequestDTO loanRequestDTO){
//        Loan
//    }
}
