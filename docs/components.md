# Design System Components

A biblioteca de componentes do TGT segue os princípios de Brutalismo de Energia Local.

## Typography
Use para todos os elementos de texto.

```tsx
<Typography variant="massive">TGT</Typography> // Hero
<Typography variant="display">Título</Typography> // Seções
<Typography variant="body">Texto padrão</Typography>
```

## Card
Blocos de construção da interface. Default é `sharp`.

```tsx
<Card variant="sharp">
  Conteúdo
</Card>

<Card variant="elevated">
  Conteúdo destacado
</Card>
```

## Button
Elementos de ação principais.

```tsx
<Button variant="primary">Ação Principal</Button>
<Button variant="secondary">Ação Secundária</Button>
```

## IconButton
Ações baseadas em ícones.

```tsx
<IconButton variant="primary" size="lg">
  <Icon />
</IconButton>
```

## Badge
Status e categorias.

```tsx
<Badge variant="primary">NOVO</Badge>
<Badge variant="success">VERIFICADO</Badge>
```

## Section
Wrapper padrão para seções de página.

```tsx
<Section background="gray" padding="xl">
  Conteúdo da seção
</Section>
```

## Cores
Lembre-se de usar as variáveis CSS ou classes Tailwind:
- `bg-brand-primary` (Laranja)
- `bg-brand-secondary` (Azul)
- `bg-brand-accent` (Amarelo)
