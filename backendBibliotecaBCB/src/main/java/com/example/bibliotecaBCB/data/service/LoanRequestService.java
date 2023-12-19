package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.LoanRequest;
import com.example.bibliotecaBCB.data.repository.LoanRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanRequestService {
    private final LoanRequestRepository loanRequestRepository;


    public LoanRequestService(LoanRequestRepository loanRequestRepository) {
        this.loanRequestRepository = loanRequestRepository;
    }

    public List<LoanRequest> findAll(){
        return loanRequestRepository.findAll();
    }

    public void save(LoanRequest loanRequest){
        loanRequestRepository.save(loanRequest);
    }

    public void update(LoanRequest loanRequest){
        loanRequestRepository.save(loanRequest);
    }

}
