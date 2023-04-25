import React, { useEffect, useState } from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => setError(error))
    }, [])
  return { data, error }
}

export default useFetch