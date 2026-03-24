'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpIcon, PaperclipIcon, SquareIcon } from 'lucide-react'
import type { ComponentProps, FormEvent, KeyboardEvent } from 'react'
import { forwardRef, useCallback, useRef } from 'react'

export type ComposerProps = ComponentProps<'form'> & {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const Composer = ({ className, onSubmit, ...props }: ComposerProps) => (
  <form
    className={cn(
      'border-border bg-card relative flex w-full flex-col gap-2 rounded-2xl border p-2',
      className
    )}
    onSubmit={onSubmit}
    {...props}
  />
)

export type ComposerInputProps = Omit<
  ComponentProps<'textarea'>,
  'value' | 'onChange'
> & {
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: () => void
  submitOnEnter?: boolean
}

export const ComposerInput = forwardRef<
  HTMLTextAreaElement,
  ComposerInputProps
>(
  (
    {
      className,
      value,
      onValueChange,
      onSubmit,
      submitOnEnter = true,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (submitOnEnter && e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          onSubmit?.()
        }
      },
      [submitOnEnter, onSubmit]
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onValueChange?.(e.target.value)
        // Auto-resize
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
      },
      [onValueChange]
    )

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        className={cn(
          'placeholder:text-muted-foreground max-h-40 min-h-[44px] w-full resize-none bg-transparent px-3 py-3 text-sm focus:outline-none',
          className
        )}
        {...props}
      />
    )
  }
)

ComposerInput.displayName = 'ComposerInput'

export type ComposerActionsProps = ComponentProps<'div'>

export const ComposerActions = ({
  className,
  ...props
}: ComposerActionsProps) => (
  <div
    className={cn('flex items-center justify-between px-1', className)}
    {...props}
  />
)

export type ComposerSubmitButtonProps = ComponentProps<typeof Button> & {
  isLoading?: boolean
}

export const ComposerSubmitButton = ({
  className,
  isLoading,
  disabled,
  ...props
}: ComposerSubmitButtonProps) => (
  <Button
    type="submit"
    size="icon"
    className={cn('size-8 shrink-0 rounded-full', className)}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading ? (
      <SquareIcon className="size-4" />
    ) : (
      <ArrowUpIcon className="size-4" />
    )}
    <span className="sr-only">{isLoading ? 'Stop' : 'Send'}</span>
  </Button>
)

export type ComposerAttachmentButtonProps = ComponentProps<typeof Button> & {
  onAttach?: () => void
}

export const ComposerAttachmentButton = ({
  className,
  onAttach,
  ...props
}: ComposerAttachmentButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
    onAttach?.()
  }, [onAttach])

  return (
    <>
      <input ref={inputRef} type="file" className="hidden" multiple />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('size-8 shrink-0', className)}
        onClick={handleClick}
        {...props}
      >
        <PaperclipIcon className="size-4" />
        <span className="sr-only">Attach file</span>
      </Button>
    </>
  )
}

export type ComposerToolbarProps = ComponentProps<'div'>

export const ComposerToolbar = ({
  className,
  ...props
}: ComposerToolbarProps) => (
  <div className={cn('flex items-center gap-1', className)} {...props} />
)
