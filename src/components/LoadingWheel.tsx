/**
 * Simple animated loading wheel
 */

export default function LoadingWheel() {
    return (
        <div className="min-w-full min-h-full flex justify-center items-center">
            <div className="rounded-full border-emerald-50 border-t-emerald-700 size-8 border-8 animate-spin">
            </div>
        </div>
    )
}