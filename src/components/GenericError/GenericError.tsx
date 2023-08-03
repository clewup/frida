import Button from '@/components/Button/Button'
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
                  <h3 className="font-bold text-2xl text-center">Uh oh! Something went wrong!</h3>
                  {error !== null && <p className="pt-4 text-center">Error: {error.message}</p>}
                  <div className="modal-action justify-center gap-10">
                      <Button onClick={() => { router.push('/') }}>
                          Home
                      </Button>
                      {(reset != null) && (
                          <Button onClick={reset}>
                              Try Again
                          </Button>
                      )}
                  </div>
              </div>
          </div>
      </main>
  )
}
export default GenericError
