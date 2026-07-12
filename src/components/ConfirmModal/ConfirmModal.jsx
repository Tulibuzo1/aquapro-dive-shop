import { Modal, Button } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa'

const ConfirmModal = ({ show, onHide, onConfirm, title, message }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <FaExclamationTriangle className="text-warning me-2" />
        {title || 'Confirmar acción'}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>{message || '¿Estás seguro de que deseas realizar esta acción?'}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Cancelar</Button>
      <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
    </Modal.Footer>
  </Modal>
)

export default ConfirmModal
