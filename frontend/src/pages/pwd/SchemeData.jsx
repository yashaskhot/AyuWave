import React from "react";
import InsuranceTable from "./Scheme";

export default function SchemeData() {
    
const insuranceData = [
    {
        "heading": "1) Ayushman Bharat:",
        "content": "This scheme came into existence because of recommendations made by the National Health Policy. Ayushman Bharat Yojana is designed keeping in mind Universal Health Coverage (UHC). Health services in India are largely segmented and Ayushman Bharat aims to make them comprehensive. It is about looking at the health sector as a whole and ensure continuous care for the people of India.",
        "links": [
            {
                "url": "https://www.acko.com/health-insurance/ayushman-bharat-yojana-scheme/"
            }
        ]
    },
    
        {
            "heading": "1) Ayushman Bharat:",
            "content": "This scheme came into existence because of recommendations made by the National Health Policy. Ayushman Bharat Yojana is designed keeping in mind Universal Health Coverage (UHC). Health services in India are largely segmented and Ayushman Bharat aims to make them comprehensive. It is about looking at the health sector as a whole and ensure continuous care for the people of India.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/ayushman-bharat-yojana-scheme/"
                }
            ]
        },
        {
            "heading": "2) Awaz Health Insurance Scheme:",
            "content": "This is a health insurance cover for migrant workers and is initiated by the Government of Kerala. It also offers insurance for death by accident for labourers. The scheme was launched in the year 2017 and targeted 5 lakh inter-state migrant labourers working in Kerala. The health insurance coverage offered under Awaz Health Insurance is Rs.15000, while the cover for death is Rs.2 lakh.",
            "links": []
        },
        {
            "heading": "3) Aam Aadmi Bima Yojana:",
            "content": "The Aam Aadmi Bima Yojana (AABY) is meant for people involved in certain vocations such as Carpentry, Fishing, Handloom weaving, etc. There are 48 such defined vocations. Before 2013, there were two policies of similar nature, AABY and Janashree Bima Yojana (JBY). After 2013, JBY was merged with AABY.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/aam-aadmi-bima-yojana/"
                }
            ]
        },
        {
            "heading": "4) Bhamashah Swasthya Bima Yojana:",
            "content": "Rajasthan Government, supports insurance initiatives towards its citizens under the Bahmashah Swasthya Bima Yojana. This is a cashless claims scheme for rural people of Rajasthan. There is no prescribed age limit for availing the benefits of this scheme.",
            "links": []
        },
        {
            "heading": "5) Central Government Health Scheme (CGHS):",
            "content": "As the name suggests, this policy is initiated by India\u2019s Central Government. Central Government employees are eligible for this policy. For example, Supreme Court judges, Certain Railway Board employees, etc. This policy has been active for six decades and has covered more than 35 lakh employees and pensioners.",
            "links": []
        },
        {
            "heading": "6) Chief Minister\u2019s Comprehensive Insurance Scheme:",
            "content": "This is a state government scheme. It is promoted by Tamil Nadu Government in association with United India Insurance Company Ltd. The Chief Minister\u2019s Comprehensive Insurance Scheme is a family floater plan designed for quality health care.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/chief-ministers-comprehensive-health-insurance-scheme/"
                }
            ]
        },
        {
            "heading": "7) Employees\u2019 State Insurance Scheme:",
            "content": "A huge number of people worked in factories post-independence in India. The working conditions were such that there were injuries and deaths as well. This is where the concept of insurance proved beneficial. Employees\u2019 State Insurance Scheme was launched in the year 1952 to offer a financial cover in case of illness, disability or death faced by insured workers/employees.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/employees-state-insurance-scheme/"
                }
            ]
        },
        {
            "heading": "8) Karunya Health Scheme:",
            "content": "Kerala Government had launched this initiative in the year 2012. Karunya Health Scheme is directed towards providing Health Insurance for listed chronic illnesses. It is a Critical Illness plan for the poor and covers major diseases such as Cancer, Kidney Ailments, Heart-related medical issues, etc.",
            "links": []
        },
        {
            "heading": "9) Mahatma Jyotiba Phule Jan Arogya Yojana:",
            "content": "This policy is initiated by the Government of Maharashtra, for the betterment of its downtrodden people. Rajiv Gandhi Jeevandayee Arogya Yojana was renamed as Mahatma Jyotiba Phule Jan Arogya Yojana in the year 2017.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/mahatma-jyotiba-phule-jan-arogya-yojana/"
                }
            ]
        },
        {
            "heading": "10) Mukhyamantri Amrutum Yojana:",
            "content": "The Government of Gujarat launched the Mukhyamantri Amrutum Yojana in the year 2012 for the benefit of the state\u2019s poor people. Lower middle-class families and those living below the poverty line are eligible for this cover.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/mukhyamantri-amrutum-yojana/"
                }
            ]
        },
        {
            "heading": "11) Pradhan Mantri Suraksha Bima Yojana:",
            "content": "This scheme came into existence to offer accident insurance to the people of India. In 2016, it was observed that only 20% of the Indian citizens had an insurance cover. However, Pradhan Mantri Suraksha Bima Yojana aspires to change this statistic in a positive manner.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/pradhan-mantri-suraksha-bima-yojana/"
                }
            ]
        },
        {
            "heading": "12) Dr YSR Aarogyasri Health Care Trust Andhra Pradesh State Government:",
            "content": "The Andhra Pradesh Government along with the Dr YSR Aarogyasri Trust, which works for health care, has come up with four beneficial welfare schemes. These schemes cater to different people and assist them in time of need.",
            "links": []
        },
        {
            "heading": "13) Telangana State Government \u2013 Employees and Journalists Health Scheme:",
            "content": "This health scheme is offered by the Telangana Government for its employees and journalists. It is beneficial for those who are currently working as well as those who have retired and are pensioners. The highlight of this scheme is the cashless treatment.",
            "links": []
        },
        {
            "heading": "14) Rashtriya Swasthya Bima Yojana:",
            "content": "This scheme is directed towards people working in the unorganized sector. Often, they are not covered under any insurance policy. And in such a scenario, if they fall ill \u2013 which happens frequently \u2013 their savings get exhausted. Thus, they are never able to ensure they have savings in the bank. This is where health insurance can prove helpful to them.",
            "links": []
        },
        {
            "heading": "15) Universal Health Insurance Scheme:",
            "content": "Globally, a lot of developed and developing nations have some sort of health care schemes for the benefit of their poor people. In India, the Universal Health Insurance Scheme aspires to do that and much more. This scheme can be availed by the poorest of the poor in the age group of 5 to 70 years.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/universal-health-insurance-scheme/"
                }
            ]
        },
        {
            "heading": "16) Yeshasvini Health Insurance Scheme:",
            "content": "The Yeshasvini Health Insurance Scheme is promoted by the Karnataka State Government. It is meant for farmers and peasants associated with a co-operative society. More than 800 procedures (Orthopaedic, Neurology, Angioplasty, etc.) are covered as per this insurance policy.",
            "links": []
        },
        {
            "heading": "17) West Bengal Health Scheme:",
            "content": "This scheme was launched by the Government of West Bengal for its employees in the year 2008. It is also applicable for pensioners. It received an update in the year 2014 and was called West Bengal Health for All Employees and Pensioners Cashless Medical Treatment Scheme.",
            "links": [
                {
                    "url": "https://www.acko.com/health-insurance/west-bengal-health-scheme/"
                }
         ]
     }
    
    
];
  return (
    
        <InsuranceTable data={insuranceData}/>
    
  )
}


