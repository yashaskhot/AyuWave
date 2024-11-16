import React from 'react';
import { useEffect } from 'react';
import Navbar from '../../Components/Navbar';


const InsuranceTable = ({ data }) => {

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
      };

      useEffect(() => {
        // Speak welcome message when the component loads
        speak("Ayushman Bharat. This scheme came into existence because of recommendations made by the National Health Policy. Ayushman Bharat Yojana is designed keeping in mind Universal Health Coverage (UHC). Health services in India are largely segmented and Ayushman Bharat aims to make them comprehensive. It is about looking at the health sector as a whole and ensure continuous care for the people of India. ")
        speak("Awaz Health Insurance Scheme. This is a health insurance cover for migrant workers and is initiated by the Government of Kerala. It also offers insurance for death by accident for labourers. The scheme was launched in the year 2017 and targeted 5 lakh inter-state migrant labourers working in Kerala. The health insurance coverage offered under Awaz Health Insurance is Rs.15000, while the cover for death is Rs.2 lakh.")
        speak("Aam Aadmi Bima Yojana. The Aam Aadmi Bima Yojana (AABY) is meant for people involved in certain vocations such as Carpentry, Fishing, Handloom weaving, etc. There are 48 such defined vocations. Before 2013, there were two policies of similar nature, AABY and Janashree Bima Yojana (JBY). After 2013, JBY was merged with AABY.")
        speak("Bhamashah Swasthya Bima Yojana. Rajasthan Government, supports insurance initiatives towards its citizens under the Bahmashah Swasthya Bima Yojana. This is a cashless claims scheme for rural people of Rajasthan. There is no prescribed age limit for availing the benefits of this scheme.")
    }, []);

    return (
        <>
        <Navbar/>
        <div className="mx-auto text-center  "><p className="h2">Schemes</p></div>
        <div className='container'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Content</th>
                        <th>Links</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="border-end border-start">{item.heading}</td>
                            <td className="border-end">{item.content}</td>
                            <td className="border-end">
                                {item.links.length > 0 ? (
                                    <a href={item.links[0].url} target="_blank" rel="noopener noreferrer">
                                        Link
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default InsuranceTable;
