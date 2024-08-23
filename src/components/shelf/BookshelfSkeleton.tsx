export default function BookshelfSkeleton() {
    const s = "bg-emerald-700 border-2 border-emerald-950 animate-pulse w-8";
    return (
        <div className="bg-emerald-200 p-2 w-full rounded flex flex-wrap flex-row gap-1 min-h-52
        items-end justify-start gap-x-0.5 gap-y-8">

            <div className={`${s} h-40`}></div>
            <div className={`${s} h-32`}></div>
            <div className={`${s} h-44`}></div>
            <div className={`${s} h-28`}></div>
            <div className={`${s} h-48`}></div>
            <div className={`${s} h-48`}></div>
            <div className={`${s} h-28`}></div>
            <div className={`${s} h-36`}></div>
            <div className={`${s} h-40`}></div>
            <div className={`${s} h-44`}></div>
            <div className={`${s} h-44`}></div>
            <div className={`${s} h-36`}></div>
            <div className={`${s} h-28`}></div>
            <div className={`${s} h-32`}></div>
            <div className={`${s} h-36`}></div>
            <div className={`${s} h-40`}></div>
            <div className={`${s} h-32`}></div>
            <div className={`${s} h-48`}></div>


        </div>
    )
}