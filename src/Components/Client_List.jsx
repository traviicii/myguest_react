import React from 'react'
import { Link } from 'react-router-dom'

// This component produces a list item for each client in the client state

export default function Client_List( { index, client } ) {
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">        
                    <div>
                        <div className="font-bold">{client.first_name} {client.last_name}</div>
                        <div className="text-sm opacity-50">{client.phone} {client.id}</div>
                    </div>
                </div>
            </td>
            {window.innerWidth > 400 ?
                <td>
                    {client.email}
                    <br />
                    <span className="badge badge-accent badge-sm">{client.type}</span>
                </td>
                :
                ''
            }

            <th>
                
                <button className="btn btn-xs btn-error"><Link to={`/client/${client.id}`}>Details</Link></button>
            </th>
        </tr>
    )
}
