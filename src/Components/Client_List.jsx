import React from 'react'
import { Link } from 'react-router-dom'

// This component produces a list item for each client in the client state

export default function Client_List({ index, client }) {
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{client.first_name} {client.last_name}</div>
                        <span className="badge badge-accent badge-sm">{client.type}</span>
                    </div>
                </div>
            </td>
            {window.innerWidth > 400 ?
                <td>
                    {client.email}
                    <br />
                    <div className="text-sm opacity-50">{client.phone}</div>
                </td>
                :
                ''
            }

            <th>

                <button className="btn btn-xs btn-primary"><Link to={`/client/${client.id}`}>Details</Link></button>
            </th>
        </tr>
    )
}
