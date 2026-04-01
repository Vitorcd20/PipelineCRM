import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Loader2 } from 'lucide-react'
import { useCreateOpportunity } from '../../hooks/use-opportunities'
import { useUIStore } from '../../store/ui.store'
import { createOpportunitySchema, type CreateForm } from '../../lib/schemas'
import { toast } from '../ui/toast'

export function CreateModal() {
  const { isCreateOpen, closeCreate } = useUIStore()
  const { mutateAsync, isPending } = useCreateOpportunity()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateForm>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues: { status: 'aberta' },
  })

  if (!isCreateOpen) return null

  const onSubmit = async (values: CreateForm) => {
    try {
      await mutateAsync(values)
      toast.success('Opportunity created!')
      reset()
      closeCreate()
    } catch {
      toast.error('Failed to create. Please try again.')
    }
  }

  return (
    <div
      className="overlay"
      onClick={e => e.target === e.currentTarget && closeCreate()}
    >
      <div className="modal anim-scale-in" data-testid="create-modal">
        <div className="modal-head">
          <div>
            <h2 className="modal-title">New Opportunity</h2>
            <p className="modal-sub">Add a new deal to your pipeline</p>
          </div>
          <button className="modal-x" onClick={closeCreate} aria-label="Close">
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div className="field">
              <label className="field-label">Title *</label>
              <input
                {...register('titulo')}
                className={`field-input ${errors.titulo ? 'err' : ''}`}
                placeholder="e.g. ERP System Development"
              />
              {errors.titulo && <span className="field-err">{errors.titulo.message}</span>}
            </div>

            <div className="field">
              <label className="field-label">Client *</label>
              <input
                {...register('cliente')}
                className={`field-input ${errors.cliente ? 'err' : ''}`}
                placeholder="e.g. Acme Corporation"
              />
              {errors.cliente && <span className="field-err">{errors.cliente.message}</span>}
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Value (USD) *</label>
                <input
                  {...register('valor', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  className={`field-input ${errors.valor ? 'err' : ''}`}
                  placeholder="50000"
                />
                {errors.valor && <span className="field-err">{errors.valor.message}</span>}
              </div>
              <div className="field">
                <label className="field-label">Status</label>
                <select {...register('status')} className="field-select">
                  <option value="aberta">Open</option>
                  <option value="em_negociacao">Negotiating</option>
                  <option value="fechada">Won</option>
                  <option value="perdida">Lost</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="field-label">Description</label>
              <textarea
                {...register('descricao')}
                className="field-textarea"
                placeholder="Brief description of the opportunity…"
              />
              {errors.descricao && <span className="field-err">{errors.descricao.message}</span>}
            </div>
          </div>

          <div className="modal-foot">
            <button type="button" className="btn-secondary" onClick={closeCreate}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isPending}>
              {isPending ? (
                <><Loader2 size={14} className="anim-spin" /> Creating…</>
              ) : (
                'Create Opportunity'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
