import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InsuranceTable = ({ data }) => {
    return (
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
    );
};

export default InsuranceTable;
