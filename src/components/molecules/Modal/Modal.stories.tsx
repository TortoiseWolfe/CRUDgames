// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '@/components/atoms/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible modal dialog component with various sizes and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Control modal visibility',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size preset',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close modal when clicking backdrop',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Close modal when pressing Escape key',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
function ModalDemo({ 
  children, 
  buttonText = 'Open Modal',
  ...modalProps 
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonText}</Button>
      <Modal {...modalProps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <ModalDemo title="Default Modal">
      <p>This is the modal content. You can put any content here.</p>
    </ModalDemo>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ModalDemo 
      title="Modal with Description"
      description="This modal includes a description below the title for additional context."
    >
      <p>Main content goes here after the title and description.</p>
    </ModalDemo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <ModalDemo buttonText="Small" size="sm" title="Small Modal">
        <p>This is a small modal, perfect for simple confirmations.</p>
      </ModalDemo>
      
      <ModalDemo buttonText="Medium" size="md" title="Medium Modal">
        <p>This is a medium modal, the default size for most use cases.</p>
      </ModalDemo>
      
      <ModalDemo buttonText="Large" size="lg" title="Large Modal">
        <p>This is a large modal, good for forms or detailed content.</p>
      </ModalDemo>
      
      <ModalDemo buttonText="Extra Large" size="xl" title="Extra Large Modal">
        <p>This is an extra large modal, suitable for complex interfaces.</p>
      </ModalDemo>
      
      <ModalDemo buttonText="Full Screen" size="full" title="Full Screen Modal">
        <p>This modal takes up the full screen width and height.</p>
      </ModalDemo>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo 
      title="Modal with Footer"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      }
    >
      <p>This modal includes footer actions for user interactions.</p>
    </ModalDemo>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <ModalDemo 
      title="Modal without Close Button"
      showCloseButton={false}
      footer={
        <div className="flex justify-end">
          <Button variant="primary">Got it</Button>
        </div>
      }
    >
      <p>This modal doesn't have a close button in the header. Users must use the footer action or ESC key.</p>
    </ModalDemo>
  ),
};

export const NoBackdropClose: Story = {
  render: () => (
    <ModalDemo 
      title="Backdrop Click Disabled"
      closeOnBackdrop={false}
    >
      <p>Clicking the backdrop won't close this modal. Use the close button or ESC key.</p>
    </ModalDemo>
  ),
};

export const FormExample: Story = {
  render: () => (
    <ModalDemo 
      buttonText="Open Form"
      title="User Registration"
      description="Please fill in your details to create an account"
      size="lg"
      footer={
        <div className="flex justify-between w-full">
          <Button variant="ghost">Already have an account?</Button>
          <div className="flex gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Register</Button>
          </div>
        </div>
      }
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded-md" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded-md" placeholder="••••••••" />
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">I agree to the terms and conditions</span>
          </label>
        </div>
      </form>
    </ModalDemo>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <ModalDemo 
      buttonText="Delete Item"
      title="Confirm Deletion"
      size="sm"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      }
    >
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </ModalDemo>
  ),
};

export const ImageModal: Story = {
  render: () => (
    <ModalDemo 
      buttonText="View Image"
      title="Product Image"
      size="xl"
    >
      <img 
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800" 
        alt="Product"
        className="w-full rounded-lg"
      />
      <p className="mt-4 text-gray-600">
        Beautiful modern sofa perfect for any living space.
      </p>
    </ModalDemo>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <ModalDemo 
      buttonText="Open Long Content"
      title="Terms of Service"
      size="lg"
    >
      <div className="prose max-w-none">
        <h3>1. Introduction</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <h3>2. User Agreement</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <h3>3. Privacy Policy</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        
        <h3>4. Terms of Use</h3>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <h3>5. Limitations</h3>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        
        <h3>6. Contact Information</h3>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
        
        <h3>7. Additional Terms</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <h3>8. Conclusion</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </ModalDemo>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <ModalDemo 
      buttonText="Custom Styled Modal"
      title="Custom Modal"
      className="bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="p-4 bg-white rounded-lg">
        <p>This modal has custom background styling applied.</p>
      </div>
    </ModalDemo>
  ),
};