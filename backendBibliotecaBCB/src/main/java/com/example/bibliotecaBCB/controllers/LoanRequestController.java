package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.dto.LoanRequestDTO;
import com.example.bibliotecaBCB.data.entity.LoanRequest;
import com.example.bibliotecaBCB.data.service.LoanRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/loanRequest")
public class LoanRequestController {
    private final LoanRequestService loanRequestService;

    public LoanRequestController(LoanRequestService loanRequestService) {
        this.loanRequestService = loanRequestService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<LoanRequestDTO>> getAllLoanRequests(){
        List<LoanRequest> loanRequestList = loanRequestService.findAll();
        List<LoanRequestDTO> loanRequestDTOList = loanRequestList.stream().map(LoanRequestDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(loanRequestDTOList);
    }

    @PostMapping("/create")
    public ResponseEntity<LoanRequestDTO> createLoanRequest(@RequestBody LoanRequestDTO loanRequestDTO){
         return ResponseEntity.ok(loanRequestService.create(loanRequestDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<LoanRequestDTO> updateLoanRequest(@RequestBody LoanRequestDTO loanRequestDTO){
        return ResponseEntity.ok(loanRequestService.update(loanRequestDTO));
    }
}
