import {useRouter} from 'next/navigation'
import React, {type FC} from 'react'
import {Button} from "@/components/ui/button";
import {IconHome, IconRefresh} from "@tabler/icons-react";

interface Props {
    error: Error
    reset?: () => void
}

export const GenericError: FC<Props> = ({error, reset}) => {
    const router = useRouter()

    return (
        <main>
            <input type="checkbox" id="my-modal" className="modal-toggle" checked={true} onChange={() => null}/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center">Uh oh! Something went wrong!</h3>

                    {error !== null && <p className="pt-4 text-center">Error: {error.message}</p>}

                    <div className="modal-action justify-center gap-10">
                        <Button onClick={() => {
                            router.push('/')
                        }}>
                            <IconHome/> Home
                        </Button>

                        {(reset != null) && (
                            <Button onClick={reset}>
                                <IconRefresh/> Try Again
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
