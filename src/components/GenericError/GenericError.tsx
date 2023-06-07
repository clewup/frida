import { useRouter } from 'next/navigation'
import React, { type FC } from 'react'

interface GenericErrorProps {
  error: Error
  reset?: () => void
}

const GenericError: FC<GenericErrorProps> = ({ error, reset }) => {
  const router = useRouter()

  return (
      <main>
          <input type="checkbox" id="my-modal" className="modal-toggle" checked={true} onChange={() => null} />
          <div className="modal">
              <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Uh oh! Something went wrong!</h3>
                  {error && <p className="py-4">Error: {error.message}</p>}
                  <div className="modal-action justify-center gap-10">
                      <button className="btn btn-primary" onClick={() => { router.push('/') }}>
                          Home
                      </button>
                      {reset && (
                          <button className="btn btn-secondary" onClick={reset}>
                              Try Again
                          </button>
                      )}
                  </div>
              </div>
          </div>
      </main>
  )
}
export default GenericError
