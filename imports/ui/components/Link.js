import React from 'react'

const Link = ({ link }) => {
  const shortLink = `http://localhost:3000/${link.token}`

  return (
    <tr>
      <td>{link.url}</td>
      <td>
        <a href={shortLink}>{shortLink}</a>
      </td>
      <td>
        {link.clicks}
      </td>
    </tr>
  )
}

export default Link
