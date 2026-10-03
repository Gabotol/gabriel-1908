import { useSessionStore } from '@/store/useSessionStore'
import { currencyFormatter } from '@/utils/currencyFormatter'

export function Welcome() {
  const { loggedUser } = useSessionStore()

  return (
    <section className="flex flex-wrap items-end justify-between gap-4 px-6 pt-6">
      <h1 className="text-2xl font-semibold">
        Bienvenido(a) {loggedUser.name}
      </h1>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">Saldo</p>
        <p className="text-2xl font-semibold">
          {currencyFormatter(loggedUser.amount)}
        </p>
      </div>
    </section>
  )
}
