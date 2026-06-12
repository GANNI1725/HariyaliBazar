import PropTypes from 'prop-types'
import { useProducts } from '../../context/ProductContext'
import ProductCard from './ProductCard'
import SectionHeader from '../shared/SectionHeader'

const RelatedProducts = ({ product }) => {
  const { getRelatedProducts } = useProducts()
  const related = getRelatedProducts(product, 4)
  if (!related.length) return null

  return (
    <section className="mt-16">
      <SectionHeader
        eyebrow="More from this category"
        title="You Might Also Like"
        center={false}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

RelatedProducts.propTypes = {
  product: PropTypes.object.isRequired,
}

export default RelatedProducts
